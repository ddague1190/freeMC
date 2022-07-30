import * as React from 'react';
import ResponsiveAppBar from '../components/AppBar';
import BackToTop from '../components/ScrollTop';
import ProductHero from '../components/ProductHero';
import ProductValues from '../components/ProductValues';
import ProductCategories from '../components/ProductCategories';
import ProductHowItWorks from '../components/ProductHowItWorks';
import ProductSmokingHero from '../components/ProductSmokingHero';
import AppFooter from '../components/AppFooter';
import getMongoDb from "../utils/db/mongodb";


function Index(props) {
  return (
    <>
      <div id="back-to-top-anchor" />
      <ResponsiveAppBar />
      <BackToTop />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductSmokingHero />
      <AppFooter />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();
  const u = await db.collection('users').find({}).toArray()
  

  

  return {
    props: {

    }
  }
}

export default Index;