import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_REACTION } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ReactionForm = ({ thoughtId }) => {
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addReaction, { error }] = useMutation(ADD_REACTION);
    // , {
    //     update(cache, { data: { addThought } }) {
    //         try {
    //             // could potentially not exist yet, so wrap in a try...catch
    //             // read what's currently in the cache
    //             const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

    //             // prepend the newest thought to the front of the array
    //             cache.writeQuery({
    //                 query: QUERY_THOUGHTS,
    //                 data: { thoughts: [addThought, ...thoughts] }
    //             });
    //         } catch (e) {
    //             console.error(e);
    //         }

    //         //update me object's cache, appending new thought to the end of the array
    //         const { me } = cache.readQuery({ query: QUERY_ME });
    //         cache.writeQuery({
    //             query: QUERY_ME,
    //             data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
    //         });
    //     }
    // });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add thought to database
            await addReaction({
                variables: { thoughtId, reactionBody }
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    value={reactionBody}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReactionForm;