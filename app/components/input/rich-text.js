import Component from '@glimmer/component';

export default class InputRichTextComponent extends Component {
  options = {
    theme:   'snow',
    modules: {
      toolbar: [
        [{ header: [ 2, 3, 4, false ] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [ 'link' ],
        [ 'clean' ]
      ]
    }
  }
}
