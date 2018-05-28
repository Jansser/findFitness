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