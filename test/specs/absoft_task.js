let chai = require('chai'), foxImg, dogImg, catImg
chai.use(require('chai-http'))
let nodemailer = require('nodemailer')
let randomEmails
describe("ab_soft_title", function () {
    it('open the site', function () {
        browser.url("https://getnada.com");
        let randomEmail = $('[class="address what_to_copy"]').getText()
        randomEmails = randomEmail;
        console.log(randomEmail);
    });
    it('get RandomCat (API)', function () {
        return chai.request("https://aws.random.cat")
            .get("/meow")
            .then(function (meow) {
                console.log(meow.body.file);
                catImg = meow.body.file;
            })
            .catch(function (errnoError) {
                console.log(errnoError)
            })
    });
    it('get RandomDog (API)', function () {
        return chai.request("https://random.dog")
            .get("/woof.json")
            .then(function (dog) {
                console.log(dog.body.url);
                dogImg = dog.body.url;
            })
            .catch(function (errnoError) {
                console.log(errnoError)
            })
    });
    it('get RandomFox (API)', function () {
        return chai.request("https://randomfox.ca")
            .get("/floof/")
            .then(function (fox) {
                console.log(fox.body.link);
                foxImg = fox.body.link;
            })
            .catch(function (errnoError) {
                console.log(errnoError)

            });
    });
    it('email sent ', function () {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'absofttesting@gmail.com',
                pass: 'xqrz4vdg'
            },
        })
        let sobaka = 'sobakaUniqLink'
        let cat = "catWithUniquLink"
        let fox = 'foxWithUniquLink'
        let mailOption = {
            from: 'absofttesting@gmail.com',
            to: randomEmails,
            subject: 'Links',
            text: sobaka.link(dogImg) + '\n' + fox.link(foxImg) + '\n' + cat.link(catImg)
        }
        transporter.sendMail(mailOption, function (err, data) {
            if (err) {
                console.log('ERROR');
            } else {
                console.log("All sent")
            }
        })

    })
    it('waitEmail', function () {
        let myEmail = $("[class=\"fn\"]")
        myEmail.waitForDisplayed({timeout: 10000000})
        myEmail.click()
    })
    it('assertElements and create screenshots', function () {
        browser.pause(1000)
        browser.switchToFrame(1)
        let dogEle = $('//body/a[1]').getAttribute('href')
        let foxEle = $('//body/a[2]').getAttribute('href')
        let catEle = $('//body/a[3]').getAttribute('href')
        chai.assert.equal(dogEle, dogImg);
        chai.assert.equal(foxEle, foxImg);
        chai.assert.equal(catEle, catImg);
        browser.newWindow(dogEle)
        browser.pause(1000)
        browser.saveScreenshot("./dog.png")
        browser.newWindow(foxEle)
        browser.pause(1000)
        browser.saveScreenshot("./fox.png")
        browser.newWindow(catEle)
        browser.pause(1000)
        browser.saveScreenshot("./cat.png")

    });
})
