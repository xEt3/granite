const urlMap = {
  employee:    'employee.index',
  companyuser: {
    uri: 'anatomy.company-users',
    id:  false
  },
  department: {
    uri: 'anatomy.departments',
    id:  false
  },
  location: {
    uri: 'anatomy.locations',
    id:  false
  },
  jobopening: 'job-opening.campaign',
  actionitem: {
    uri: 'action-item',
    id:  m => (m._source.title || '').replace(/\s/g, '-')
  }
};

export default function uriForModel (model = {}) {
  const { _id, _type } = model,
        uriMapping = urlMap[_type];

  let args = [
    `account.${uriMapping.uri || uriMapping}`
  ];

  if (uriMapping.id !== false) {
    let idMap = uriMapping.id,
        idArg = idMap && typeof idMap === 'function' ? idMap(model) : _id;

    args.push(idArg);
  }

  return args;
}
