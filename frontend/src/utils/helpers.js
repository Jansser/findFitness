export const formatDate = (date) => {
  if(typeof date ==='string') {
    date = new Date(date);
  }

  return date.toLocaleString();
}

export const SCHEDULE_STATUS = {
  Solicitado: {
    key: 'Solicitado',
    icon: 'calendar outline',
    content: 'Solicitados',
    color: 'black'
  },
  Confirmado: {
    key: 'Confirmado',
    icon: 'calendar check',
    content: 'Confirmados',
    color: 'green'
  },
  Cancelado: {
    key: 'Cancelado',
    icon: 'calendar times',
    content: 'Cancelados',
    color: 'red'
  }
}

export const formValidate = {
  required: value => value ? undefined : 'Required',
  email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'E-mail inválido' : undefined
}