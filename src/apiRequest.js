const apiRequest = async (url = "", optionsObj = null, errMessg = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Please reload the app");
  } catch (error) {
    errMessg = error.message;
  } finally {
    return errMessg;
  }
};
export default apiRequest;
