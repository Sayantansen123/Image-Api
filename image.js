const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const port = 3000;



const imageurl = async (params,n) => {

  const browser = await puppeteer.launch();
  

  const page = await browser.newPage();

  try {

    await page.goto(`https://duckduckgo.com/?q=${params}&t=h_&iar=images&iax=images&ia=images`);



    await page.waitForSelector('.tile--img__img.js-lazyload'); // Replace 'h1' with your target element
   

    const data = await page.evaluate((n) => {

      const image = document.querySelectorAll('.tile--img__img.js-lazyload');
      const imagearray = Array.from(image);
      const selection = imagearray.slice(0,n);

      const url = selection.map(element => {
        return element.getAttribute('src');
      });

      return url;
    },n);


    return data;

  } catch (error) {

  } finally {

    await browser.close();
  }
};



app.get('/images/&searchName=:parameter/&numberImages=:number', async (req, res) => {
  try {
    const imageid = req.params.parameter;
    const numberparams = Number(req.params.number);
    console.log(typeof(numberparams));
    console.log(numberparams);
    
    const datas = await imageurl(imageid,numberparams);
    res.json({
      searchName: imageid,
      Images: datas,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})