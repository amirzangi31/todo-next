import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

function Loader() {
    return (


        <ThreeCircles
            height="50"
            width="50"
            color="#3f47f4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
        />

    )
}

export default Loader