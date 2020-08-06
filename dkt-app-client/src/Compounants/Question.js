import React from 'react';
import '../site.css';
import Form from 'react-bootstrap/Form';

export default function Question(props) {
    return (
        <div className="question" onChange={(event) => props.onUserSelect(event.target.value) }>
            <label>{props.question.QuestionText}</label>
            {props.question.Options.map(o => {
                return (
                    <div>
                        <Form.Check
                            type='radio'
                            value={o.id}
                            label={o.text}
                            name={props.question.id}
                        />
                        {/* <input id={o.id} type="radio" value={o.id} Name="questions" />
                        <label for={o.id}>{o.text}</label> */}
                    </div>

                );
            })}
        </div>
    );
};