import React from 'react';
import './styles.scss';
class RhymeScheme extends React.Component  {

    constructor(props){
        super(props);
        this.state = {
           
        }
    }
    

    render(){
        return (
            <div className="rhyme-scheme">
                <h2>Rhyme Scheme</h2>

                <div className="complexity">
                    <h2>9.7</h2>
                    <h4>Complexity</h4>
                </div>
                <br />
                <div className="unique">
                    <h2>56</h2>
                    <h4>Unique Rhymes</h4>
                </div>

                <div className="averages">
                    <div className="rhyme">
                        <h2>3</h2>
                        <h4>Syllables per Rhyme</h4>
                    </div>
                    <div className="bar">
                        <h2>9</h2>
                        <h4>Syllables per Bar</h4>
                    </div>
                    <div className="bar">
                        <h2>6</h2>
                        <h4>Rhymes per Bar</h4>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default RhymeScheme;