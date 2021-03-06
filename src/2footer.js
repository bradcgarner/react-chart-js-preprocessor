import React                    from 'react';
import { isObjectLiteral }      from 'conjunction-junction';
import { 
  calcMinimumWindowDimensions } from 'browser-helpers';

const Dummy = function(){
  return null;
}

export default function Footer (props){

  const fontColor = props.cssBackground === 'white' ? '#333' : 'white' ;

  const formatTitle = (titleText, groupDotColors) => {
    // this is a method, vs helper function, ONLY because it uses JSX
  
    const titleArray = [];
    for (let id in titleText) {
      const dot = typeof groupDotColors[id] === 'string' ? <div
        className='gw-title-color-dot' key={id}
        style={{backgroundColor: `rgb(${groupDotColors[id]})`}}>
      </div> : null ;
      const theTitle = <div key={id} className={`gw-title-inner-container ${titleText[id].tooltip ? 'tooltip' : ''}`}>
        {
          typeof titleText[id].link === 'string' ?
            <a href={titleText[id].link} target='_blank'>{dot}</a> :
          dot
        }
        <h3 className='gw-title gw-title-major'>
          {titleText[id].tMajor}
        </h3>
        <h3 className='gw-title gw-title-minor'>
          {titleText[id].tMinor}
        </h3>
        {
          titleText[id].tooltip ? 
            <div className='popover'><p>{titleText[id].tooltip}</p></div> :
          null
        }
      </div>
      titleArray.push(theTitle);
    }
    
    const titleTextJSX = isObjectLiteral(titleText) ?
      <div className='gw-title-wrap-container'>
        {titleArray}
        <style>{`
          .gw-title-inner-container {
            justify-content: center;
            align-items: center;
            margin-right: 25px;
            margin-left: 25px;
          }
          .gw-title-color-dot {
            border-radius: 50%;
            height: 15px;
            width: 15px;
            background-color: white;
          }
          .gw-title {
            color: ${fontColor};
            text-align: center;
            margin-top: 10px;
            margin-bottom: 10px;
            flex-grow: 1;
          }
          .gw-title.gw-subtitle {
            display: none;
          }
          @media print{
            .gw-title.gw-subtitle {
              display: block;
            }
          }
          .gw-title-wrap-container {
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
          }
          .gw-title-major {
            margin-left: 3px;
          }
          .gw-title-minor {
            font-weight: 100;
            font-size: 67%;
            opacity: 0.75;
            margin-left: 3px;
          }
          .gw-title-inner-container {
            justify-content: center;
            align-items: center;
            margin-right: 25px;
            margin-left: 25px;
          }
          .gw-title-color-dot {
            border-radius: 50%;
            height: 15px;
            width: 15px;
            background-color: white;
          }
        `}</style>
      </div> : null ;
  
    return titleTextJSX;
  };
    
  // const graphTitle      = props.titleTextJSX ? props.titleTextJSX :
  //   typeof props.titleText === 'string' ?
  //   <h3 className={`gw-title`}>{props.titleText}</h3> :
  //   <h3 className={`gw-title`}>graph!</h3>
   
  const graphTitle = formatTitle(
    props.titleText, 
    props.groupDotColors,
  );

  const graphSubTitle   = null; // <h3 className={`gw-title gw-subtitle`}>Displaying: ????</h3>

  const spinnerRight = !props.advanceAllow ?
    null :
    !props.waitingOnDataFromProps ?
    null : 
    <div className='gw-advance-waiting gw-advance-waiting-right'>
      <div/>
    </div> ;

  const spinnerLeft = !props.retreatAllow ?
    null :
    !props.waitingOnDataFromProps ?
    null : 
    <div className='gw-advance-waiting gw-advance-waiting-left'>
      <div/>
    </div> ;
      
  const hideAdvanceButtonClass = 
    props.waitingOnDataFromProps ? 
    'transparent' : 
    '' ;

  const i = props.icons || {} ;
  const IconLeft  = typeof i.CaretLeft  === 'function' ? i.CaretLeft  : typeof i.caret_left  === 'function' ? i.caret_left : Dummy;
  const IconRight = typeof i.CaretRight === 'function' ? i.CaretRight : typeof i.caret_right === 'function' ? i.caret_right: Dummy;

  const win = typeof window !== 'undefined' ? window : {} ;
  const { cssWidthOuter } = calcMinimumWindowDimensions(win);
  const bp = 500; // breakpoint
  const popoverRightClass = cssWidthOuter > bp ? 'tooltip-bottom-right' : 'tooltip-bottom-left';

  const googleTagManagerClassLeft = 'gw-event-button left true1 true2';
  const googleTagManagerClassRight = 'gw-event-button right true1 true2';

  const buttonAdvanceLeft = 
    props.retreatAllow ?
    <div className={`gw-advance-button gw-advance-button-left gw-control tooltip tooltip-bottom-left ${hideAdvanceButtonClass} ${googleTagManagerClassLeft}`} 
      onClick={()=>props.graphAdvance(-1)}>
      <div className='popover'>
        <p>retreat the graph to the prior event</p>
      </div>
      <IconLeft style={{height: 36}} />
    </div> :
    <div className='gw-advance-button gw-control'/> ;

  const buttonAdvanceRight = 
    props.advanceAllow ?
    <div className={`gw-advance-button gw-advance-button-right gw-control tooltip ${popoverRightClass} ${hideAdvanceButtonClass} ${googleTagManagerClassRight}`} 
      onClick={()=>props.graphAdvance(1)}>
      <div className='popover'>
        <p>advance the graph to the next event</p>
      </div>
      <IconRight style={{height: 36}} />
    </div> :
    <div className='gw-advance-button gw-control'/> ;

  const spinnerMargin = 80;
  const spinnerSize = (Math.random()*20)+40;
  const spinnerColorIndex = Math.floor(Math.random()*5);
  const spinnerColors = ['red', 'yellow', 'pink', 'green', 'purple', 'blue'];
  const spinnerColor = spinnerColors[spinnerColorIndex] || 'white' ;

  return <div className='gw-footer'
    style={props.cssDivFooter}>
    <div className='gw-footer-top'>
      {buttonAdvanceLeft}
      {spinnerLeft}
      {graphTitle}
      {graphSubTitle}
      {spinnerRight}
      {buttonAdvanceRight}
    </div>
    <div className='gw-footer-bottom'>
      <p className='gw-footer-description'>
        {typeof props.legendDescription === 'string' ? props.legendDescription : ''}
      </p>
    </div>

    <style>{`
    .gw-footer {
      flex-direction: column;
    }
    @media print {
      .gw-footer {
        display: none;
      }
    }
    .gw-title {
      color: ${fontColor};
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
      flex-grow: 1;
    }
    .gw-advance-spinner-container {
      height: 36px;
      overflow: hidden;
    }
    .gw-advance-spinner-container .line-scale-pulse-out-rapid > div {
      background-color: white ;
    }
    .gw-advance-button {
      position: absolute;
      width: 45px;
      justify-content: center;
      align-items: center;
    }
    .gw-advance-button:hover {
      opacity: 0.7;
    }
    .gw-advance-button-left {
      left: 0;
      bottom: 110px;
    }
    .gw-advance-button-right {
      left: 0;
      bottom: 50px;
    }
    @media(min-width: ${bp}px){
      .gw-advance-button-left {
        left: 0;
        bottom: 0;
      }
      .gw-advance-button-right {
        left: auto;
        right: 0;
        bottom: 0;
      }
    }
    .gw-control {
      cursor: pointer;
      color: ${fontColor};
    }
    @media print {
      .gw-control {
        display: none !important;
      }
    }
    .gw-footer-top {
      width: 100%;
      position: relative;
      justify-content: space-between;
      min-height: 36px;
    }
    .gw-footer-bottom {
      width: 100%;
    }
    .gw-footer-description {
      font-size: 12px;
      line-height: 14px;
      font-weight: 100;
      opacity: 0.85;
      text-align: left;
      color: ${fontColor};
      padding: 20px;
      width: 100%;
    }

    .gw-advance-waiting {
      position: absolute;
      top: 50%;
      margin-top: -${spinnerSize/2}px;
    }
    .gw-advance-waiting-left {
      left: ${spinnerMargin}px;
      margin-left: -${spinnerSize/2}px;
    }
    .gw-advance-waiting-right {
      right: ${spinnerMargin}px;
      margin-right: -${spinnerSize/2}px;
    }
    .gw-advance-waiting > div {
      width: ${spinnerSize}px;
      height: ${spinnerSize}px;
      background-color: ${spinnerColor};
      border-radius: 100%;
      -webkit-animation: blinking 1.0s infinite ease-in-out;
      animation: blinking 1.0s infinite ease-in-out;
    }

    @-webkit-keyframes blinking {
      0% { -webkit-transform: scale(0.0) }
      100% {
        -webkit-transform: scale(1.0);
        opacity: 0;
      }
    }
    
    @keyframes blinking {
      0% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 100% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
        opacity: 0;
      }
    }
    `}</style>
  </div>

}