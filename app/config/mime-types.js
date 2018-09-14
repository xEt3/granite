export default [{
  strategy: 'extension',
  match:    /xlsx?/i,
  icon:     'file excel outline'
}, {
  strategy: 'extension',
  match:    /docx?/i,
  icon:     'file word outline'
}, {
  strategy: 'extension',
  match:    /pdf/i,
  icon:     'file pdf outline'
}, {
  strategy: 'mimeType',
  match:    /zip|rar|archive/i,
  icon:     'file archive outline'
}, {
  strategy: 'mimeType',
  match:    /image\//i,
  icon:     'file image outline'
}, {
  strategy: 'mimeType',
  match:    /application\//i,
  icon:     'file code outline'
}, {
  strategy: 'mimeType',
  match:    /text\//i,
  icon:     'file text outline'
}, {
  strategy: 'mimeType',
  match:    /video\//i,
  icon:     'file video outline'
}];
