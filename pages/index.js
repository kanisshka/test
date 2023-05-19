import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { useState , useEffect} from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import PieChart from '../components/PieChart';


export default function Home() {
  const [headerImage, setHeaderImage] = useState("https://img.freepik.com/free-psd/shopping-sales-background_23-2150343492.jpg?w=996&t=st=1684502219~exp=1684502819~hmac=51715f67f89853f34bc860cc29792cf0f1acdf57f7e07a65b859a76f6f07b9f6");

  const handleRowClick = (imageUrl) => {
    setHeaderImage(imageUrl);
  };

  return (
    <div className='main'>
      <Head><title>Kanisshka's Project</title></Head>
      <h4 className='para'>PART 1 - This is the Header Image which is <span className='font-main'>changed</span> whenever any Row is clicked</h4>
      <Header imageUrl={headerImage} />
      <hr />
      <h4 className='para'>PART 2 - This is the Component where we have a <br/><span className='font-main'>SEARCH</span> field to search by category and the <br/><span className='font-main'>FILTER</span> by category and choose from the dropdown menu and last but not the least the <br/><span className='font-main'>SORTING</span> feature which is implemented on Price Column to sort by Ascending or Descending Order by clicking on price.</h4>
      <div><Table onRowClick={handleRowClick} /></div>
    <h4 className='para'>
    PART 3 - This is the <br/><span className='font-main'>PIE CHART</span> which is based on API Data which is Open Source API <br/>and onHover it will reflect the count of items present in the particular category and <br/>when we click that slice it will write the data at the end of the page.
    </h4>
      <PieChart />
    </div>
  )
}
