import BaseLiComponent from './base';
import { or } from '@ember/object/computed';

export default BaseLiComponent.extend({ isPendingState: or('model.isLoading', 'model.isSaving', 'model.isReloading') });
