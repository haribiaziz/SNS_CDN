jQuery(document).ready(function ($) {

    //open/close mega-navigation
    $('.cd-dropdown-trigger').on('click', function (event) {
        event.preventDefault();
        toggleNav();
    });

    //close meganavigation
    $('.cd-dropdown .cd-close').on('click', function (event) {
        event.preventDefault();
        toggleNav();
    });

    //on mobile - open submenu
    $('.has-children').children('a').on('click', function (event) {
        //prevent default clicking on direct children of .has-children 
        event.preventDefault();
        var selected = $(this);
        selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
    });



    /* Anything that gets to the document
will hide the dropdown */
    $(document).click(function () {
        var navIsVisible = (!$('.cd-dropdown').hasClass('dropdown-is-active')) ? true : false;
        if (!navIsVisible) {
            toggleNav();
        }
    });



    /* Clicks within the dropdown won't make
    it past the dropdown itself */
    $(".cd-dropdown-wrapper").click(function (e) {
        e.stopPropagation();
    });

 
  
   

    //on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
    var submenuDirection = (!$('.cd-dropdown-wrapper').hasClass('open-to-left')) ? 'right' : 'left';
    $('.cd-dropdown-content').menuAim({
       
        activate: function (row) {
            $(row).children().addClass('is-active').removeClass('fade-out');
            var labellll = $(row).attr("data-id");
            //nouveaut�s
           //     $.ajax({
           //         type: "POST",
           //         //data: labellll,
           //         contentType: 'application/json',
           //         url: '/Home/NewTrainingsByCategory/' + labellll,

           //         success: function (data) {
           //             var Trainings = data.Trainings;
           //             // console.log(Trainings.length);
           //             var html = "";
           //             for (var i = 0; i < Trainings.length; i++) {
           //                 // console.log(Trainings[i].Categorie);
           //                 html = html + "<li itemprop='itemListElement' itemscope itemtype='http://schema.org/ListItem' style='margin-left: 10px;'>"

           //               + " <span class='thumb-info thumb-info-hide-wrapper-bg' onclick='location.href='/tutoriel/" + Trainings[i].TrainingUrl + "'" + "style='max-width:100% !important;margin-bottom:10px;cursor:pointer'>"
           //+ "<span class='thumb-info-wrapper'>"
           //                + "<img src='" + Trainings[i].TrainingBgM + "'" + "class='img-fluid' alt='Formation' style='height:100px'>"
           //                 + " <span class='thumb-info-title'>"
           //                     + "<span class='thumb-info-inner'>" + Trainings[i].Duration + "</span>"
           //                     + "<span class='thumb-info-type'>" + Trainings[i].TrainingPrice + "<sup>" + Trainings[i].Devise + "</sup> TTC</span>"
           //                + "</span>"
           //             + "</span>"
           //            + "<span class='thumb-info-caption'>"
           //                 + "<span class='thumb-info-caption-text'>" + Trainings[i].TrainingTitle + "</span>"
           //              + "</span>"
           //         + "</span>  </li>";


           //             }
           //             $("#resultTrainings").append(html);
           //         }
                     
           //     });

                       
                //        //populaires
                //            $.ajax({
                //                type: "POST",
                //                contentType: 'application/json',
                //                url: '/Home/PopularTrainingsByCategory/' + labellll,

                //                success: function (data) {
                //                    var Trainings = data.Trainings;
                //                    // console.log(Trainings.length);
                //                    var html2 = "";
                //                    for (var i = 0; i < Trainings.length; i++) {
                //                        // console.log(Trainings[i].Categorie);
                //                        html2 = html2 + "<li itemprop='itemListElement' itemscope itemtype='http://schema.org/ListItem' style='margin-left: 10px;'>"

                //                      + " <span class='thumb-info thumb-info-hide-wrapper-bg' onclick='location.href='/tutoriel/" + Trainings[i].TrainingUrl + "'" + "style='max-width:100% !important;margin-bottom:10px;cursor:pointer'>"
                //       + "<span class='thumb-info-wrapper'>"
                //                       + "<img src='" + Trainings[i].TrainingBgM + "'" + "class='img-fluid' alt='Formation' style='height:100px'>"
                //                        + " <span class='thumb-info-title'>"
                //                            + "<span class='thumb-info-inner'>" + Trainings[i].Duration + "</span>"
                //                            + "<span class='thumb-info-type'>" + Trainings[i].TrainingPrice + "<sup>" + Trainings[i].Devise + "</sup> TTC</span>"
                //                       + "</span>"
                //                    + "</span>"
                //                   + "<span class='thumb-info-caption'>"
                //                        + "<span class='thumb-info-caption-text'>" + Trainings[i].TrainingTitle + "</span>"
                //                     + "</span>"
                //                + "</span>  </li>";


                //                    }

                //                    console.log(html2);
                                 

                //                   $("#resultTrainingsPopular").append(html2);

                //    }
                //});
           
         

                if ($('.cd-dropdown-content .fade-in').length == 0) $(row).children('ul').addClass('fade-in');
           

        },
        deactivate: function (row) {

            $(row).children().removeClass('is-active');
            //$(row).find("#resultTrainings").remove();
            //$(row).find("#resultTrainingsPopular").remove();

            if ($('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row))) {


                $('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
                $(row).children('ul').addClass('fade-out');

            }

        },
        exitMenu: function () {
            $('.cd-dropdown-content').find('.is-active').removeClass('is-active');
            return true;
        },

        submenuDirection: submenuDirection,

    });




    //submenu items - go back link
    $('.go-back').on('click', function () {
        var selected = $(this),
			visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
        selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
    });


    function toggleNav() {
        var navIsVisible = (!$('.cd-dropdown').hasClass('dropdown-is-active')) ? true : false;
        $('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
        $('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
        if (!navIsVisible) {
            $('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
             
                $('.has-children ul').addClass('is-hidden');
                $('.move-out').removeClass('move-out');
                $('.is-active').removeClass('is-active');
            });
        }
    }

    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if (!Modernizr.input.placeholder) {
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }
});