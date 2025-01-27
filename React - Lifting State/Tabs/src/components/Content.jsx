import React from 'react'

const Content = (props) => {
    const {showContent} = props;
  return (
    <div>
        Tab {showContent} content is shown here.
    </div>
  )
}

export default Content