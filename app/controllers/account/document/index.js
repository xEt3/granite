import Controller from 'granite/core/controller';
import { match } from '@ember/object/computed';

export default class AccountDocumentController extends Controller {
  @match('model.extension', /je?pg|png|gif/i) imagePreview
}
