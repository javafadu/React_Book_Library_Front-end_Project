import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

/* Get All Loans of Authenticated User */
export const getAuthLoanedBooks = (
  page = 0,
  size = 2,
  sort = "loanDate",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/loans?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  );
};

/* Get Loans of selected Book */
export const getLoansOfBook = (
  id = 0,
  page = 0,
  size = 2,
  sort = "loanDate",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/loans/book/${id}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  );
};

export const updateLoan = (loanId, loan) => {
  return axios.put(`${API_URL}/loans/${loanId}`, loan, {
    headers: authHeader(),
  });
};

export const getAnyLoanWithId = (loanId) => {
  return axios.get(`${API_URL}/loans/auth/${loanId}`, {
    headers: authHeader(),
  });
};

export const saveLoan = (loan) => {
  return axios.post(`${API_URL}/loans`, loan, {
    headers: authHeader(),
  });
};

/* Get Loans of selected User */
export const getLoansOfUser = (
  id = 0,
  page = 0,
  size = 5,
  sort = "loanDate",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/loans/user/${id}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  );
};
