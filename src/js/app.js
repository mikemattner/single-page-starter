import scroll from './lib/scroll';
import objectFitImages from 'object-fit-images';
import videoModal from './lib/video';
import $ from 'jquery'
import 'slick-carousel';
import formValidator from './lib/form';


/**
 * Website JavaScript uses ES6 class syntax
 * This class should initialize all of your custom scripts.
 *
 * @class App
 */
class App {

    /**
     * Creates an instance of App.
     * @memberof App
     */
    constructor() {

        new scroll();
        objectFitImages('.object-fit');
        new videoModal();
        this.prepareSlickPlugin.bind(this)();
        new formValidator();
    }

    prepareSlickPlugin() {
        const checkSlickReady = () => {
            if ('slick' in $()) {
                this.initializeSlickPlugin();
                console.log('Slider initialized!');
            } else {
                setTimeout(checkSlickReady, 100);
                console.log('Slider not ready.');
            }
        };
        checkSlickReady();
    }

    initializeSlickPlugin() {

        let slickOptions = {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '10%',
            arrows: true,
            dots: true,
            infinite: false,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    arrows: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 4000
                }
            }, ]
        };

        $('.featured-events__slider').slick(slickOptions);

    }

}

new App();