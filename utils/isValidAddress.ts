import React from 'react';
import { Address } from '../store/store-info/state';
import states from '../data/states';

const isValidAddress = (address: Address) => {
  return address?.name && address?.streetAddress && address?.state && address?.zip
}

export default isValidAddress