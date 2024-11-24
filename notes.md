# Notes

## AWS resources

- t2.micro instance: joshhend-cs260server-base
- security group: launch-wizard-1
- elastic ip: 3.214.245.1 (eipalloc-013016ba4021b0d10)
- domain name: quikvote.click
- hosted zone: quikvote.click

## push to server

```bash
./deployService.sh -k [key pair file] -h quikvote.click -s startup
```


## ssh into server

```bash
ssh -i [key pair file] ubuntu@3.214.245.1
```

## TIL

### DNS records

There are many different DNS records you can store on the DNS server. One is an `A` record.
`A` records tell the DNS what ip address to map the domain name to. Others, like `NS` or `SOA` are
for security purposes.

### Let's Encrypt

Before Let's Encrypt, it used to cost a ton of money to get a certification. Now it's really cheap/free.

### HTML

The `<menu>` tag is deprecated in favor of the `<nav>` tag.


# Midterm notes

## HTML Elements and Their Functions

### 1. The `<link>` Element
- **Purpose**: Defines a relationship between the current HTML document and an external resource.
- **Common Use**: Linking external style sheets to the HTML document.
- **Syntax**:
  ```html
  <link rel="stylesheet" href="styles.css">
  ```
- **Attributes**:
  - `rel`: Specifies the relationship (e.g., `"stylesheet"`).
  - `href`: Specifies the URL of the linked resource.

### 2. The `<div>` Element
- **Purpose**: A generic container for grouping and styling content.
- **Characteristics**:
  - Has no semantic meaning (i.e., doesn't convey meaning about its contents).
  - Used with CSS and JavaScript to style and manipulate grouped content.
- **Usage**:
  ```html
  <div class="container">
    <!-- Content here -->
  </div>
  ```

## CSS Selectors and Styling

### 3. Difference Between `#title` and `.grid` Selectors
- `#title`:
  - Selects an element with the **id** attribute `title`.
  - **Syntax**: `#title { /* styles */ }`
  - **Usage**: Targets a unique element on the page.
- `.grid`:
  - Selects all elements with the **class** attribute `grid`.
  - **Syntax**: `.grid { /* styles */ }`
  - **Usage**: Targets multiple elements that share the same class.

### 4. Padding vs. Margin
- **Padding**:
  - Space **inside** an element's border.
  - Increases the space between the content and the border.
  - **CSS**: `padding: 10px;`
- **Margin**:
  - Space **outside** an element's border.
  - Creates space between the element and neighboring elements.
  - **CSS**: `margin: 10px;`

### 5. Displaying Images Using Flexbox
- **Flex Container**:
  - Apply `display: flex;` to the parent element.
  - **CSS Example**:
    ```css
    .image-container {
      display: flex;
      flex-direction: row; /* or column */
      justify-content: center; /* alignment along main axis */
      align-items: center; /* alignment along cross axis */
    }
    ```
- **Effects**:
  - Images will align according to flex properties.
  - Responsive layout adjustments.

### 6. Understanding Padding CSS
- **Example**:
  ```css
  padding: 10px 20px 15px 5px; /* top right bottom left */
  ```
- **Shorthand Properties**:
  - One value: `padding: 10px;` (all sides)
  - Two values: `padding: 10px 20px;` (vertical horizontal)
  - Three values: `padding: 10px 20px 15px;` (top horizontal bottom)
  - Four values: `padding: top right bottom left;`

## JavaScript Concepts

### 7. Arrow Function Syntax
- **Definition**:
  ```javascript
  const functionName = (parameters) => {
    // function body
  };
  ```
- **Characteristics**:
  - Shorter syntax compared to traditional functions.
  - Does not have its own `this` binding.
- **Example**:
  ```javascript
  const add = (a, b) => a + b;
  ```

### 8. Using `map()` with Arrays
- **Purpose**: Creates a new array by applying a function to each element of an existing array.
- **Syntax**:
  ```javascript
  const newArray = originalArray.map(element => {
    // return transformed element
  });
  ```
- **Example**:
  ```javascript
  const numbers = [1, 2, 3];
  const doubled = numbers.map(num => num * 2); // [2, 4, 6]
  ```

### 9. Using `getElementById` and `addEventListener`
- **Selecting an Element**:
  ```javascript
  const element = document.getElementById('myId');
  ```
- **Adding an Event Listener**:
  ```javascript
  element.addEventListener('click', function() {
    // code to execute on click
  });
  ```
- **Outcome**: When the element with `id="myId"` is clicked, the specified function runs.

### 10. JavaScript `#` Selector
- **Usage**:
  ```javascript
  const element = document.querySelector('#elementId');
  ```
- **Purpose**: Selects the element with the specified `id`.
- **Note**: `document.querySelector` accepts CSS selectors.

## Document Object Model (DOM)

### 11. True Statements About the DOM
- The DOM is a programming interface for HTML and XML documents.
- Represents the document as a hierarchical tree of nodes (elements, text, attributes).
- Allows scripts to dynamically access and update content, structure, and styles.

### 12. Default Display Property of `<span>`
- **Display Value**: `inline`
- **Characteristics**:
  - Does not start on a new line.
  - Width and height properties have no effect.
  - Margins and padding only affect left and right spacing.

## CSS Techniques

### 13. Changing All `<div>` Elements Background to Red
- **CSS Rule**:
  ```css
  div {
    background-color: red;
  }
  ```

### 14. Displaying an Image with a Hyperlink
- **HTML Syntax**:
  ```html
  <a href="http://example.com">
    <img src="image.jpg" alt="Description">
  </a>
  ```
- **Outcome**: Clicking the image navigates to the specified URL.

### 15. CSS Box Model Order
- **From Inside Out**:
  1. **Content**
  2. **Padding**
  3. **Border**
  4. **Margin**

### 16. Setting Specific Text to Green
- **Assuming HTML Structure**:
  ```html
  <p>... <span class="highlight">trouble</span> ...</p>
  ```
- **CSS Rule**:
  ```css
  .highlight {
    color: green;
  }
  ```
- **Outcome**: Only the text within `<span class="highlight">` is styled.

## JavaScript Programming

### 17. For Loop and `console.log` Output
- **Understanding Loops**:
  - For loops iterate over a sequence of values.
  - `console.log` outputs the current value in each iteration.
- **Example**:
  ```javascript
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  // Outputs: 0, 1, 2, 3, 4
  ```

### 18. Changing Element Text Color to Green
- **JavaScript Code**:
  ```javascript
  document.getElementById('byu').style.color = 'green';
  ```
- **Steps**:
  1. Select the element with `id="byu"`.
  2. Modify the `color` style property.

## HTML Basics

### 19. Opening HTML Tags
- **Paragraph**: `<p>`
- **Ordered List**: `<ol>`
- **Unordered List**: `<ul>`
- **Second Level Heading**: `<h2>`
- **First Level Heading**: `<h1>`
- **Third Level Heading**: `<h3>`

### 20. Declaring the Document Type
- **HTML5 Doctype**:
  ```html
  <!DOCTYPE html>
  ```

## JavaScript Syntax

### 21. Control Structures
- **If Statement**:
  ```javascript
  if (condition) {
    // code if true
  } else {
    // code if false
  }
  ```
- **For Loop**:
  ```javascript
  for (initialization; condition; increment) {
    // loop code
  }
  ```
- **While Loop**:
  ```javascript
  while (condition) {
    // loop code
  }
  ```
- **Switch Statement**:
  ```javascript
  switch (expression) {
    case value1:
      // code
      break;
    case value2:
      // code
      break;
    default:
      // code
  }
  ```

### 22. Creating a JavaScript Object
- **Object Literal Syntax**:
  ```javascript
  const myObject = {
    property1: value1,
    property2: value2,
  };
  ```

### 23. Adding New Properties to Objects
- **Yes, It's Possible**:
  ```javascript
  myObject.newProperty = newValue;
  ```
- **Or Using Bracket Notation**:
  ```javascript
  myObject['newProperty'] = newValue;
  ```

### 24. Including JavaScript in HTML
- **Using `<script>` Tag**:
  ```html
  <script src="script.js"></script>
  ```
- **Inline Script**:
  ```html
  <script>
    // JavaScript code here
  </script>
  ```

### 25. Changing Specific Text with JavaScript
- **Assuming HTML Structure**:
  ```html
  <p id="animal">animal</p>
  <p>fish</p>
  ```
- **JavaScript Code**:
  ```javascript
  document.getElementById('animal').textContent = 'crow';
  ```

## JSON Overview

### 26. Description of JSON
- **Definition**: JavaScript Object Notation
- **Characteristics**:
  - Text format for storing and transporting data.
  - Syntax similar to JavaScript objects.
  - Language-independent but uses conventions familiar to programmers of the C-family of languages.
- **Example**:
  ```json
  {
    "name": "John",
    "age": 30,
    "isStudent": false
  }
  ```

## Console Commands and Their Functions

### 27. Common Console Commands
- **`chmod`**: Change file access permissions.
- **`pwd`**: Print working directory (current directory path).
- **`cd`**: Change directory.
- **`ls`**: List directory contents.
- **`vim`**: Open the Vim text editor.
- **`nano`**: Open the Nano text editor.
- **`mkdir`**: Make a new directory.
- **`mv`**: Move or rename files/directories.
- **`rm`**: Remove files or directories.
- **`man`**: Display the manual for a command.
- **`ssh`**: Secure Shell, log into a remote machine.
- **`ps`**: Display current processes.
- **`wget`**: Download files from the internet.
- **`sudo`**: Execute a command with superuser privileges.

### 28. Creating a Remote Shell Session
- **Command**: `ssh username@hostname`
- **Purpose**: Connect to a remote machine securely.

### 29. Using `ls -la` Command
- **Effects**:
  - Lists **all** files and directories, including hidden ones (those starting with `.`).
  - Provides a **long** listing format (detailed information like permissions, owner, size).

## Domain Names and Networking

### 30. Domain Name Breakdown
- **Example**: `banana.fruit.bozo.click`
- **Top-Level Domain (TLD)**: `.click`
- **Root Domain**: `bozo.click`
- **Subdomains**:
  - First-level subdomain: `fruit`
  - Second-level subdomain: `banana`

### 31. Web Certificates and HTTPS
- **Necessity**:
  - A valid SSL/TLS certificate is required to establish an HTTPS connection.
  - Certificates ensure encrypted communication between client and server.

### 32. DNS A Records
- **Function**:
  - Maps a domain name to an IPv4 address.
  - **Cannot** point to another A record; must point directly to an IP address.
- **Note**:
  - For aliasing, use a CNAME record instead.

### 33. Reserved Ports and Their Protocols
- **Port 80**: HTTP (HyperText Transfer Protocol)
- **Port 443**: HTTPS (HTTP Secure)
- **Port 22**: SSH (Secure Shell)

## JavaScript Promises

### 34. Understanding Promises Output
- **Concepts**:
  - A Promise represents the eventual completion (or failure) of an asynchronous operation.
  - **States**: Pending, Fulfilled (Resolved), Rejected.
- **Syntax**:
  ```javascript
  const promise = new Promise((resolve, reject) => {
    // asynchronous operation
  });

  promise
    .then(result => {
      // handle success
    })
    .catch(error => {
      // handle error
    });
  ```
- **Example Output**:
  - Depends on whether the Promise is resolved or rejected.
  - Use `console.log` within `.then()` or `.catch()` to display output.

