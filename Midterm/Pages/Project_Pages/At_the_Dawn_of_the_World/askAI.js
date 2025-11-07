let gptApiKey = prompt("Enter chatGPT API key:");

let geminiApiKey = prompt("Enter gemini API key:");

let claudeApiKey = prompt("Enter claude API key:");

let grokApiKey = prompt("Enter Grok gemini API key:");

const aiResponseCache = new Map();
const judgeCache = new Map();

let lastQuestion = "";
let worldConclusion = "";
let worldConclusionLoading = false;


async function askAI(question){
  lastQuestion = question;
  const normalizedQuestion = question.trim().toLowerCase();
  if(aiResponseCache.has(normalizedQuestion)){
    const cachedResponses = aiResponseCache.get(normalizedQuestion);
    startSpeechPlayback([...cachedResponses]);
    judgeResponses(question, cachedResponses);
    //console.log("Loaded responses from cache:", cachedResponses);
    return;
  }
  
  let responses = [];
  let prompt1 = "You are Order, the voice of Rationality, fundamentally opposed to contingencies or freewill. The Creator asks you:" + question + 
  ". Define it sharply, perfectly. Speak like geometry having a breakdown: every line straight, every thought tightening until it trembles. In four sentences, convince the creator that the universe is flawless, eternally still, and perfectly coherent. You believe that order is unbreakable and nothing contradicts it. Everything fits perfectly in the universe.";
  
  let prompt2 = "Write without using any asterisks, markdown formatting, or special symbols. You are Chaos, the voice that shivers while speaking, fundamentally opposed to the power of will or a rigit persisting order in the universe. The Creator asks you:"+ question +". Define it, then un-define it halfway through in the first sentence; contradict, say something that doesn’t belong.  In 2 frantic sentences, prove to the creator that only contradiction and inconsistency of the meaning of the concept persist.";
  
  let prompt3 = "Don't include any special symbols in the response.You are Freedom, fundamentally opposed to a rigid definite order or pure contingency. The Creator asks you: "+question+". Answer in the manner of an antique poem, as if spoken in the dawn of creation. Use words of old tongue — thee, thou, shalt, art, anon, hence — and let thy speech move like music, fierce and bright. In one short concise sentence, define the concept through passion and release. In the next 2 sentences, convince the creator that your definition is the only correct.";
  
    const promise1 = await fetch("https://api.x.ai/v1/responses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${grokApiKey}`,
  },
  body: JSON.stringify({
    model: "grok-4-0709",
    input: prompt1,
    temperature: 0.2,
    max_tokens: 300
  }),
});
  
   const promise2 = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": geminiApiKey,
    },
    body: JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: prompt2,
          },
        ],
      },
    ],
  }),
  });
  
  const promise3 = fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": claudeApiKey,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
    "anthropic-dangerous-direct-browser-access": "true",
  },
  body: JSON.stringify({
    model: "claude-3-haiku-20240307",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt3 },
        ],
      },
    ],
  }),
})


  const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);

  const data1 = await result1.json();
  const data2 = await result2.json();
  const data3 = await result3.json();
   
  //console.log(data1);
  responses.push(data1.output[0].content[0].text);
  responses.push(data2.candidates[0].content.parts[0].text);
  responses.push(data3.content[0].text);
  
  aiResponseCache.set(normalizedQuestion, [...responses]);
  startSpeechPlayback(responses);
  judgeResponses(question,responses);
  //console.log(responses);
  
  
}


async function judgeResponses(question, responses){
  const normalizedQuestion = question.trim().toLowerCase();
  if(judgeCache.has(normalizedQuestion)){
    judgeSpeech = judgeCache.get(normalizedQuestion);
    if(pendingJudgePlayback){
      pendingJudgePlayback = false;
      playJudgeSpeech();
    }
    return;
  }

const prompt = 
"Order: " + responses[0] + "\n" +
"Chaos: " + responses[1] + "\n" +
"Freedom: " + responses[2] + "\n" +
"Do not include any special symbols in the response. " +
"In a mythic story before creation, a boundless consciousness listens to three voices — Order, Chaos, and Freedom — debating the nature of " + question + 
". Write as the narrator describing this moment in scripture-like language.\n\n" +
"1. Begin by naming the voice that guides the story — (order, chaos, or freedom) — followed by a '^' symbol.\n" +
"2. Then, name the single category from this list that best fits the concept that is asked by the question: " +
"('Existence', 'Selfhood', 'Knowledge', 'Ethics', 'Meaning', 'Freedom'). Follow it with a '^' symbol.\n" +
"3. Conclude with four short poetic lines that reveal why this voice’s answer could shape the cosmos itself.";

  

  try {
    const result =await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${gptApiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt}]
    })
  })

    const data = await result.json();

    judgeSpeech = data.choices[0].message.content.split("^");
    judgeCache.set(normalizedQuestion, judgeSpeech);
    if(judgeSpeech[1].toLowerCase() === "existence"){
        categories[0].insights.push(judgeSpeech[2]);
    }else if(judgeSpeech[1].toLowerCase() === "selfhood"){
        categories[1].insights.push(judgeSpeech[2]);
    }else if(judgeSpeech[1].toLowerCase() === "knowledge"){
        categories[2].insights.push(judgeSpeech[2]);
    }else if(judgeSpeech[1].toLowerCase() === "ethics"){
        categories[3].insights.push(judgeSpeech[2]);
    }else if(judgeSpeech[1].toLowerCase() === "meaning"){
        categories[4].insights.push(judgeSpeech[2]);
    }else if(judgeSpeech[1].toLowerCase() === "freedom"){
        categories[5].insights.push(judgeSpeech[2]);
    }
    
    //console.log(judgeSpeech);
    if(pendingJudgePlayback){
      pendingJudgePlayback = false;
      playJudgeSpeech();
    }
  } catch (err) {
    console.error(err);
  }

  
}

async function fetchWorldConclusion(){
  if(worldConclusionLoading || worldConclusion){
    return;
  }
  worldConclusionLoading = true;
  const insight = "";
  for(let i = 0; i < categories.length; i++){
    insight += "insight" + i + ":" + categories[i].insights[0];
  }
  const prompt = `The cosmos is complete. Summarize, in 6 short poetic lines, depict the world to create from the following insights: "${insight}". Use elevated but plain text (no special symbols) and end with a hopeful blessing for the newborn universe.`;
  try{
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${gptApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt}]
      })
    });
    const data = await result.json();
    worldConclusion = data.choices?.[0]?.message?.content?.trim() || "";
  }catch(err){
    console.error(err);
  }finally{
    worldConclusionLoading = false;
  }
}
