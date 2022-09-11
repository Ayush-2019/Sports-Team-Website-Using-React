import React, {useState, useEffect, useReducer} from "react";
import { match_collection } from "../../firebase";

const MatchFilter = (props) => (
                        <div className="match_filters">

                            <div className="match_filters_box">
                                <div className="tag">
                                    Show Match
                                </div>
                                <div className="cont">
                                   <div className= {`option ${props.state.playedFilter === 'All' ? 'active': ''}`}
                                    onClick = {() => props.showPlayed('All')}
                                   >
                                        All
                                    </div> 

                                    <div className= {`option ${props.state.playedFilter === 'Yes' ? 'active': ''}`}
                                    onClick = {() => props.showPlayed('Yes')}
                                   >
                                        Played
                                    </div> 

                                    <div className= {`option ${props.state.playedFilter === 'No' ? 'active': ''}`}
                                    onClick = {() => props.showPlayed('No')}
                                   >
                                        Not Played
                                    </div> 

                                </div>
                            </div>

                            <div className="match_filters_box">
                            <div className="tag">
                                    Result
                                </div>
                                <div className="cont">
                                   <div className= {`option ${props.state.resultFilter === 'All' ? 'active': ''}`}
                                    onClick = {() => props.showResult('All')}
                                   >
                                        All
                                    </div> 

                                    <div className= {`option ${props.state.resultFilter === 'W' ? 'active': ''}`}
                                    onClick = {() => props.showResult('W')}
                                   >
                                        W
                                    </div> 

                                    <div className= {`option ${props.state.resultFilter === 'L' ? 'active': ''}`}
                                    onClick = {() => props.showResult('L')}
                                   >
                                        L
                                    </div> 

                                    <div className= {`option ${props.state.resultFilter === 'D' ? 'active': ''}`}
                                    onClick = {() => props.showResult('D')}
                                   >
                                        D
                                    </div> 

                                </div>
                            </div>
                        </div>
)

export default MatchFilter;