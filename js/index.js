const defaultMarkup = `# Welcome to the preview

## You can add any markdown you like!

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

This is a **normal** paragraph, it may contain \`code\`:

    // This is a code block.
    var foo = function (bar) {
      return bar++;
    };

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. 

## More things down here

- a thing
- another thing
- thing 3

![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "Stormtroopocat")`;

const myMarked = (val) => marked(val, {breaks: true});

const Editor = props => (
  <div className="column">
    <textarea
      id="editor"
      onChange={props.editorOnChange}
      value={props.editorText}
    />
  </div>
);

const Preview = props => (
  <div className="column">
    <div id="preview" dangerouslySetInnerHTML={{ __html: props.previewHtml }} />
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: defaultMarkup,
      previewHtml: myMarked(defaultMarkup)
    };

    // set this constructor scope
    this.editorOnChange = this.editorOnChange.bind(this);
  }

  editorOnChange(event) {
    this.setState({
      editorText: event.target.value,
      previewHtml: myMarked(event.target.value)
    });
  }

  render() {
    return (
      <div id="container">
        <Editor
          editorOnChange={this.editorOnChange}
          editorText={this.state.editorText}
        />
        <Preview previewHtml={this.state.previewHtml} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));