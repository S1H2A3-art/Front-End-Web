# Front-End-Web

## Glossary
**Web Basics**
- **Web:** connected computers that have websites
- **Server:** computers that host websites
- **Client:** devices that access websites
- **Browser:** softwares that are used to specifically access websites on the client end

**Websites are written with three different programming languages:**
- **HTML(Hyper Text Markup Language):** markup language that structures websites
- **CSS(Cascading Style Sheets):** modifies aesthetic attributes of websites
- **Javascript:** adds real-time interactions

## HTML Essentials

HTML is written using tags that instantiate its functions. Tags adopt the form: '<' ⌢ tag_name ⌢ '>'. Some tags are declared in the form: '<' ⌢ tag_name ⌢ '>' ... '<' ⌢ '/' ⌢ tag_name ⌢ '>', where ... represents the content within the scope of the functionality of the tag. Further, tags could have attributes to declare additional information about its function: '<' ⌢ tag_name ⌢ attribute_name ⌢ '=' ⌢ attribute_value ⌢ '>'.

`<!DOCTYPE HTML>`: signifies that the version of HTML that is running is up to date

`<meta charset = "utf-8>`: declares how texts are rendered

***Structure***

`<html> ... </html>`: marks the beginning and the end of the webpage code

`<head> ... </head>`: helps the browser render the webpage

`<nav> ... </nav>`: section of a code for navigation links

`<title> ... </title>`: declares the name of the website that is shown in the tab, search results, bookmark etc

`<body> ... </body>`: what is shown on the webpage

***Text***

`<h1> ... </h1>`: level-1 heading text

`<p> ... </p>`: paragraph text

`<br>`: adds line break

`<em> ... </em>`: italicize text

`<strong> ... </strong>`: bold text

`<ul> ... </ul>`: unordered lists(bullet point notes)

`<ol> ... </ol>`: ordered lists

`<li> ... </li>`: items within a list

***Functional***

`<a href = "url" target = "_blank"> ... </a>`: the content of the tag works as an anchor to another webpage whose address is declared in the attribute: url. Set the target attribute to "_blank" to open the link on a new tab.

`<img src = "image url" alt = "description" width = "width pixels" length = "length pixels" >`: displays an image of the url declared in the src attribute. alt determines the alternative text to display if the image doesn't load.

***Table***

```
<table>                                // adds table
    <thead>                            // hold column label
        <tr>                           // add one row of header cells
            <th>...</th>               // header cells
        </tr>
    </thead>
    <tbody>                            // hold column body
        <tr>                           // first row
            <td>...</td>               // body cells
        </tr>
    </tbody>
</table>
```
***Other***

`<!-- ... -->`: comments for the viewer of the code

## CSS Essentials

CSS code is implemented into the html code through the tag: `<style> ... </style>`. The content within the style tag generally consists of two parts: selector and declaration. Selectors determine the object to style, whereas the declaration determines how to specifically style the selected object.

A piece of CSS code is formatted in the following manner:

```
selector{
    declaration: declaration_value;
}
```

***Selector***
There are different ways to select specific objects to style. 
First, "body" can be used as a selector to select all items in the html code:

```
body{
    declaration: declaration_value;
}
```
A specific category of tags can be selected by simply calling the name of the tag in the selector:

```
tag_name {
    declaration: declaration_value;
}
```

To select a specific instance of a tag, first assign a unique id as an attribute:

`<p id = "unique_id"> ... </p>`

Then, use the id of the tag as a selector and add a "#" before it to select that specific instance of it:

```
#unique_id{
    declaration: declaration_value;
}
```

Additionally, users can select a specific group of a tag by assigning a class attribute:

`<p class = "class_name"> ... </p>`

Then, use the name of the class as a selector and add a "." before it to select tags that belong to that specific class:

```
.class_name{
    declaration: declaration_value;
}
```

***Declarations***

`font-family: sans-serif/serif/other_font_types`: displays default sans-serif/serif/etc font on the user's computer

`font-family: specific_font, font_type`: first renders the specific_font. If the specific_font doesn't exist, load the default font of the selected font_type on the user's computer

More font types: monospace, cursive, fantasy ... 

`font-size: x px`: declares font size with the absolute unit of x pixels

`font-size: x em`: declares font size as x times larger than the body font size

`font-weight: bold`: bold text

`font-style: italic`: italicize text

`line-height: x px/x em`: space in between lines of text

`text-align: center/right/etc`: aligns text

`text-decoration: underline`: underlines text

***Layout***
