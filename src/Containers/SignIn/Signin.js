import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Layout from '../../Components/Layout/Layout'
import Input from '../../Components/UI/Input/Input'
import { login } from '../../actions/Action'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.error && auth.error.split("**")[1] !== "Failed to Login")
            setError({
                type: auth.error.split("**")[0],
                value: auth.error.split("**")[1]
            })
        else
            setError(null)
    }, [auth]);

    useEffect(() => {
        setError(null)
    }, [email, password])

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to="/" />
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form style={{ marginTop: '50px' }} onSubmit={userLogin}>
                            <Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type='text'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error ? error.type === "Email" ?
                                <div className="anyError mb-6">{error.value}</div>
                                : "" : ""
                            }

                            <Input
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error ? error.type === "Password" ?
                                <div className="anyError mb-6">{error.value}</div>
                                : "" : ""
                            }
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            {error ? error.type === "Server" ?
                                <div className="anyError mb-6">{error.value}</div>
                                : "" : ""
                            }
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signin
