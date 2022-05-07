import React from 'react';
import InputForm from '../components/InputForm';
import ContactList from '../components/ContactList';


const Home = () => {
  return (
    <div className="HomePage">
      <aside>
        <InputForm />
      </aside>
      <ContactList />
    </div>
  );
};

export default Home;
