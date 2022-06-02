export interface MaskInterface {
  prefix: string;
  data: string;
}

export const PHONE_MASK: MaskInterface = {
  prefix: '+375 ',
  data: '00 000-00-00',
}

export const ZIPCODE_MASK: MaskInterface = {
  prefix: '',
  data: '000000'
}
