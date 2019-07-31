// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import Datastore from 'nedb';

const fs = window.require('fs');
// const db = new Datastore({ filename: __dirname + '/datasource/datafile.db', autoload: true });
const db = new Datastore({ filename: '/Users/francescosasso/Documents/ICC/your-project-name/app/datasource/datafile.db', autoload: true });

const doc = { 
  hello: 'world', 
  n: 5, 
  today: new Date(), 
  nedbIsAwesome: true, 
  notthere: null, 
  notToBeSaved: undefined,  // Will not be saved
  fruits: [ 'apple', 'orange', 'pear' ], 
  infos: { name: 'nedb' }
};

export default function Home(props) {
  const [item, setItem] = useState(undefined);
  function insertItem() {
    db.insert(doc, function (err, newDoc) {   // Callback is optional
      // newDoc is the newly inserted document, including its _id
      // newDoc has no key called notToBeSaved since its value was undefined
      console.log(newDoc);
    });

		fs.writeFile('./datafile.db', '', (err) => {
        if (err) {
            console.log("An error ocurred creating the file "+ err.message)
        }       
        console.log("The file has been succesfully saved");
	  });
  }
  function seeItem() {
    db.find({hello: 'ehi'}, function (err, docs) {
      if (err) throw err;
      do_something_when_you_get_your_result(docs);
    });
  }

  function do_something_when_you_get_your_result(docs) {
    setItem(docs[0].hello);
  }
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <button onClick={ insertItem }>Insert</button>
      <button onClick={ seeItem }>Search</button>
      <div>{ item }</div>
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
