import fetchWrapper from "../../../utils/API/fetchWrapper";

export function fetchAdministered(testId, page = 1) {
  return async function (dispatch) {
    try {
      const administered = await fetchWrapper(
        `/api/tests/administered?test_id=${testId}&page=${page}`,
        localStorage.getItem("OPUS-TOKEN"),
        "GET"
      ).then((res) => {
        return res.administered;
      });

      dispatch({
        type: "GET_ADMINISTERED",
        payload: administered,
      });
    } catch (error) {
      console.error("Failed to fetch administered tests", error);
    }
  };
}

export function fetchTests(
  page = 0,
  resultsPerPage = 25,
  filterString = "",
  filterDate = 0,
  source = "all"
) {
  return async function (dispatch) {
    try {
      const tests = await fetchWrapper(
        `/api/data/tests?page=${page}&results_per_page=${resultsPerPage}&filter_string=${filterString}&filter_date=${filterDate}&source=${source}`,
        localStorage.getItem("OPUS-TOKEN"),
        "GET",
        {},
        false
      ).then((res) => {
        return {
          tests: res.tests,
          hasMore: res.hasMore,
        };
      });

      dispatch({
        type: "SET_TESTS",
        payload: tests,
      });
    } catch (error) {
      console.error("Failed to fetch tests", error);
    }
  };
}
