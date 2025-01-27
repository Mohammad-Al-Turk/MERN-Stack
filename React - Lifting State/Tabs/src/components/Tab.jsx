import React from 'react'

const Tab = (props) => {
    const {updateTab} = props;
    const tabs = [1,2,3]

    const handleClick = (e, tab) =>{
        updateTab(tab)
    }
  return (
    <>
    {tabs.map((tab, i)=>(
            <button key={i}
                    onClick={(e)=>handleClick(e, tab)}    
                    >Tab {tab}</button>
        ))
    }
    </>
  )
}

export default Tab