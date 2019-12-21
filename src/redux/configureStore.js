import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Campsites } from "./campsites";
import { Comments } from "./comments";
import { Partners } from "./partners";
import { Promotions } from "./promotions";
import { InitialFeedback } from "./forms";

export const ConfigureStore = () => {
  let middleware = [thunk];
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV !== "production") {
    middleware.push(logger);
  }

  const store = createStore(
    combineReducers({
      campsites: Campsites,
      comments: Comments,
      partners: Partners,
      promotions: Promotions,
      ...createForms({
        feedbackForm: InitialFeedback
      })
    }),
    applyMiddleware(...middleware)
  );
  
  return store;
};