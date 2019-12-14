var addedCSS = '';

function fetchDynamicInfo(prop, el, ignoreList, callback) {
    if (!$(el)) {
        // console.log("element "+el+" doesn't exist");
        return false;
    }
    if (!dynamic[prop]) {
        // console.log("dynamic property "+prop+" doesn't exist");
        return false;
    }
    dynamic[prop] = dynamic[prop].replace(/(\r\n\t|\n|\r\t)/gm, "");
    var props;
    var isJSON = true;
    try {
        props = JSON.parse(dynamic[prop]);
    } catch (e) {
        //console.log(e);
        // assuming data is straight up html/text
        props = dynamic[prop];
        isJSON = false;
    }

    if (!props) return false;

    ignoreList = ignoreList || {};
    if (isJSON) {
        var propDict = {
            background_color: "backgroundColor",
            padding_top: "paddingTop",
            padding_bottom: "paddingBottom",
            padding_left: "paddingLeft",
            padding_right: "paddingRight",
            font_size: "fontSize",
            font_family: "fontFamily",
            line_height: "lineHeight",
            max_width: "maxWidth",
            max_height: "maxHeight",
            margin_top: "marginTop",
            margin_bottom: "marginBottom",
            margin_left: "marginLeft",
            margin_right: "marginRight",
            legal_font_size: "fontSize",
            text_align: "textAlign",
            vertical_align: "verticalAlign"
        }

        dynamicDisclaimer = window.dynamicDisclaimer || {};

        for (var fieldProp in props) {
            if (ignoreList[fieldProp]) continue;
            if (fieldProp == "text") {
                $(el).innerHTML = props.text || "";
                if (prop == "Feature_Disclaimer") {
                    dynamicDisclaimer['main'] = props.text || "";
                }
            } else if (/frame[1-6]/.test(fieldProp) && prop == "Feature_Disclaimer") {
                dynamicDisclaimer[fieldProp.toLowerCase()] = props[fieldProp];
            } else if (fieldProp == "title") {
                $(el).alt = props.title || "";
            } else if (!propDict[fieldProp]) {
                $(el).style[fieldProp] = props[fieldProp] || "";
            } else {
                $(el).style[propDict[fieldProp]] = props[fieldProp] || "";
            }
        }
    } else {
        $(el).innerHTML = props;
    }

    if (callback) {
        callback(props);
    }
}


//for accessing image url (dynamic image = json obj)
//study this
function fetchDynamicPath(prop, el, cssPath){
		cssPath = cssPath || false;
	  if (dynamic["Default"] == true) {
		return false;
	  }
      if(!$(el)) {
        // console.log("element "+el+" doesn't exist");
        return false;
      }
      if(!dynamic[prop]) {
        // console.log("dynamic property "+prop+" doesn't exist");
        return false;
      }
      console.log(dynamic[prop]);
      var props = dynamic[prop];

      if(!props) return false;

      if (!cssPath) {
        $(el).src = props.Url;
      } else {
        $(el).style.backgroundImage  = "url('"+props.Url+"')";
      }

    }

function initDynamicContent() {


    fetchDynamicInfo("Frame_1_Headline", "frame1text1");
    fetchDynamicInfo("Frame_1_SubHead", "frame1text2");
    fetchDynamicPath("Frame_1_BG","frame1bg");
    fetchDynamicPath("Frame_1_Overlay","frame1safety");
    fetchDynamicInfo("IIHS_Logo_Copy", "disclaimer3");
    fetchDynamicInfo("Frame__1_Disclaimer", "disclaimer2");

    //fetchDynamicInfo("Frame_2_SmallHeadline","frame2text1_small");
    fetchDynamicInfo("Frame_2_Headline", "frame2text1");
    //fetchDynamicInfo("Frame_2_SubHead", "frame2text2");
    fetchDynamicPath("Frame_2_BG","frame2bg");
    fetchDynamicPath("Frame_2_Overlay","frame2light");
    fetchDynamicInfo("Frame_2_Disclaimer", "disclaimer4");

    //fetchDynamicInfo("Frame_3_SmallHeadline","frame3text1_small");
    fetchDynamicInfo("Frame_3_Headline", "frame3text1");
    //fetchDynamicInfo("Frame_3_SubHead","frame3text2");
    fetchDynamicPath("Frame_3_BG","frame3bg");
    fetchDynamicInfo("Frame_3_Disclaimer", "disclaimer5");

    //fetchDynamicInfo("Frame_4_SmallHeadline","frame4text1_small");
    fetchDynamicInfo("Frame_4_Headline", "frame4text1");
    //fetchDynamicInfo("Frame_4_SubHead", "frame4text2");
    fetchDynamicPath("Frame_4_BG","frame4bg");
    fetchDynamicPath("Frame_4_Overlay","frame4hand");
    fetchDynamicInfo("Frame_4_Disclaimer", "disclaimer6");

    fetchDynamicInfo("Frame_5_Headline", "frame5text1");
    //fetchDynamicInfo("Frame_5_SubHead", "frame5text2");
    fetchDynamicPath("Frame_5_BG","frame5bg");
    fetchDynamicInfo("Frame_5_Disclaimer", "disclaimer7");

    fetchDynamicInfo("Frame_6_nameplate", "nameplate");
    fetchDynamicInfo("Frame_7_eyecatcher_copy", "offertext1");
    fetchDynamicInfo("Frame_7_eyecatcher_price", "offertext2");
    fetchDynamicPath("Frame_6_BG","frame6bg");
    fetchDynamicPath("Frame_6_Overlay","retail");
    fetchDynamicInfo("Frame_7_Disclaimer", "disclaimer8");

    //need to add second?
    // fetchDynamicInfo("Feature_Disclaimer", "disclaimer");
    // fetchDynamicInfo("Vehicle_Disclaimer", "disclaimer2");
    // fetchDynamicInfo("Safety_Disclaimer", "disclaimer3");

    //Legal Button
    $("legalContent").innerHTML = dynamic.Legal;
    fetchDynamicInfo("Legal_Button", "legalBtn");

    fetchDynamicInfo("CTA_Text", "cta");

    fetchDynamicInfo("Stage_Logo", "brandlogo");

    //add addedCSS to head
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = addedCSS;
    } else {
        style.appendChild(document.createTextNode(addedCSS));
    }

    head.appendChild(style);

}


window.onload = function () {
    if (Enabler.isInitialized()) {
        enablerInitHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
    }
}
