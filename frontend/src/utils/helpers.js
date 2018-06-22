import { SERVER_STATIC_IMAGE_URL } from './api';

export const formatDate = (date) => {
  if(typeof date ==='string') {
    date = new Date(date);
  }

  return date.toLocaleString();
}

export const getUserPicture = user => {
  return user.isProfessional ? `${SERVER_STATIC_IMAGE_URL}\\${user.picture}` : user.picture;
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

export const formatReal = int => {
  var tmp = int+'';
  tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
  if( tmp.length > 6 )
          tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

  return tmp;
}
