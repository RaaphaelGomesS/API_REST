class HomeController {
  index(req, res) {
    res.json({ 'teste': true });
  }
}

export default new HomeController();
