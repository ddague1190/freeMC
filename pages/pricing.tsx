import React, { useEffect } from 'react'
import AppBar from '../components/AppBar';
import AppFooter from "../components/AppFooter";
import { TodoList } from '../components/test/TodoList';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

const PricingPage = () => {

  return (
    <>
    <AppBar />
    <div>pricing</div>
    <AppFooter />
    </>
  )
}

export default PricingPage