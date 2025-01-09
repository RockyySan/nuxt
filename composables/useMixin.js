export const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

export const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
};

export const toHash = (str) => {
  if (!str) {
    return;
  }

  return JSON.stringify(str);
}

export const fromHash = (str) => {
  if (!str) {
    return;
  }

  return JSON.parse((str));
}

// map error or success reponse from api
export const mapResponse = (res) => {
  const { data, meta, code, error } = res;

  return {
    data,
    error,
    code,
    meta
  };
}

// generate random id
export const randomId = (seed = 1000000) => {
  return Math.ceil(Math.random()*seed)
}
