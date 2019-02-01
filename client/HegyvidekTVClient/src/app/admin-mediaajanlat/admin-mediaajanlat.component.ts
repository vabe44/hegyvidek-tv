import { MediaajanlatService } from './../services/mediaajanlat.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { EditorInstance, EditorOption, EditorLocale } from 'angular-markdown-editor';

@Component({
  selector: 'app-admin-mediaajanlat',
  templateUrl: './admin-mediaajanlat.component.html',
  styleUrls: ['./admin-mediaajanlat.component.css']
})
export class AdminMediaajanlatComponent implements OnInit {
  bsEditorInstance: EditorInstance;
  markdownText: string;
  showEditor = true;
  templateForm: FormGroup;
  editorOptions: EditorOption;
  locale: EditorLocale = {
    language: 'hu',
    dictionary: {
      'Bold': 'Gras',
      'Italic': 'Italique',
      'Heading': 'Titre',
      'URL/Link': 'Insérer un lien HTTP',
      'Image': 'Insérer une image',
      'List': 'Liste à puces',
      'Ordered List': 'Liste ordonnée',
      'Unordered List': 'Liste non-ordonnée',
      'Code': 'Code',
      'Quote': 'Citation',
      'Preview': 'Prévisualiser',
      'Strikethrough': 'Caractères barrés',
      'Table': 'Table',
      'strong text': 'texte important',
      'emphasized text': 'texte souligné',
      'heading text': 'texte d\'entête',
      'enter link description here': 'entrez la description du lien ici',
      'Insert Hyperlink': 'Insérez le lien hypertexte',
      'enter image description here': 'entrez la description de l\'image ici',
      'Insert Image Hyperlink': 'Insérez le lien hypertexte de l\'image',
      'enter image title here': 'entrez le titre de l\'image ici',
      'list text here': 'texte à puce ici'
    }
  };

  constructor(
    private fb: FormBuilder,
    private markdownService: MarkdownService,
    private mediaajanlatService: MediaajanlatService
  ) {}

  ngOnInit() {
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    this.mediaajanlatService.getMediaajanlat().subscribe(response => {
      this.markdownText = response.mediaajanlat;
      this.buildForm(this.markdownText);
    });
    // put the text completely on the left to avoid extra white spaces
//     this.markdownText =
// `### Markdown example
// ---
// This is an **example** where we bind a variable to the \`markdown\` component that is also bind to a textarea.
// #### example.component.ts
// \`\`\`javascript
// function hello() {
//   alert('Hello World');
// }
// \`\`\`
// #### example.component.css
// \`\`\`css
// .bold {
//   font-weight: bold;
// }
// \`\`\``;

//     this.buildForm(this.markdownText);
  }


  buildForm(markdownText) {
    this.templateForm = this.fb.group({
      body: [markdownText],
      isPreview: [true]
    });
  }

  /** highlight all code found, needs to be wrapped in timer to work properly */
  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  hidePreview() {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  showFullScreen(isFullScreen: boolean) {
    if (this.bsEditorInstance && this.bsEditorInstance.setFullscreen) {
      this.bsEditorInstance.showPreview();
      this.bsEditorInstance.setFullscreen(isFullScreen);
    }
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());
    this.highlight();

    return markedOutput;
  }

  save() {
    console.log(this.markdownText);
    this.mediaajanlatService.modosit(this.markdownText)
    .subscribe(response => {
      alert(response.message);
    });
  }
}
