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
  }
};

export default function uriForModel (model = {}) {
  const { _id, _type } = model,
        uriMapping = urlMap[_type];

  let args = [
    `account.${uriMapping.uri || uriMapping}`
  ];

  if (uriMapping.id !== false) {
    args.push(_id);
  }

  return args;
}
