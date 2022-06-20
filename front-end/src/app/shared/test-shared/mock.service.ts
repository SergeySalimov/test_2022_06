export const mockTodoService = jasmine.createSpyObj('todoService', [
  'todoList$',
  'statusEnum$',
  'getPartialTodos',
  'addTodoItem',
  'removeTodoItem',
  'getItemById',
  'updateTodoItem',
  'checkStatus',
  'getStatusEnum',
  'updateTodosWithoutServer',
]);

export const mockTranslateService = jasmine.createSpyObj('TranslateService', [
  'addLangs',
  'setDefaultLang',
  'instant',
]);

export const mockCommonService = jasmine.createSpyObj('CommonService', [
  'showLoader$',
  'message$',
  'showLoader',
  'hideLoader',
  'addMessage',
  'removeMessage',
]);
