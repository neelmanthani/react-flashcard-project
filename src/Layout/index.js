import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Routes, Route} from "react-router-dom";
import DeckList from "../home/DeckList";
import Study from "../deck/Study";
import CreateDeck from "../deck/CreateDeck"
import ViewDeck from "../deck/ViewDeck"
import EditDeck from "../deck/EditDeck"
import EditCard from "../card/EditCard"
import CreateCard from "../card/CreateCard"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route path="/" element={<DeckList />}/>
          <Route path="decks">
            <Route path="new" element={<CreateDeck />}/>
            <Route path=":deckId">
              <Route path="" element={<ViewDeck />}/>
              <Route path="study" element={<Study />}/>
              <Route path="edit" element={<EditDeck />}/>
              <Route path="cards">
                <Route path="new" element={<CreateCard />}/>
                <Route path=":cardId/edit" element={<EditCard />}/>
              </Route>
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </div>
    </>
  );
}

export default Layout;
