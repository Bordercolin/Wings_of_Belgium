export const HandleIncomingNewsData = async (req, res) => {
  console.log(req.body.task.capturedLists.Belair);
  //save to database
  res.status(200).json({
    foo: "bar",
  });
};

export const GetNewsData = async (req, res) => {
  res.status(200).json([
    {
      Position: "1",
      image:
        "https://beldefnews.mil.be/wp-content/uploads/2024/05/202404_RedCondor_20240044--800x600.jpg",
      Title: "3e Bataljon Parachutisten: meesters van de nacht",
      Link: "https://beldefnews.mil.be/3e-bataljon-parachutisten-meesters-van-de-nacht/",
      Date: "2 mei 2024",
    },
  ]);
};
