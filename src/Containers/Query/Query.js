import React, { useEffect } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Components/Layout/Layout';
import { getInitialData } from '../../actions/initialData.action';
import { FaSyncAlt } from 'react-icons/fa';

const Query = () => {

    const query = useSelector(state => state.message)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])


    //to show the Queries
    const renderQueries = () => {
        return (
            <Table style={{ fontSize: "16px", width: "100%" }} responsive="sm">
                <thead style={{ textAlign: "center" }}>
                    <tr>
                        <th>S. No.</th>
                        <th>Message Date</th>
                        <th>Message Time</th>
                        <th>From</th>
                        <th>Customer Email</th>
                        <th>Message/Query</th>
                        <th style={{ textAlign: "center" }}>Reply</th>

                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {
                        query.queries.length > 0 ?
                            query.queries.map((query, index) => <tr key={query._id}>
                                <td>{index + 1}</td>
                                <td>{`${new Date((query.createdAt).toString()).toLocaleDateString().split("/")[1]}/${new Date((query.createdAt).toString()).toLocaleDateString().split("/")[0]}/${new Date((query.createdAt).toString()).toLocaleDateString().split("/")[2]}`}</td>
                                <td>{new Date((query.createdAt).toString()).toLocaleTimeString()}</td>
                                <td>{query.name}</td>
                                <td>{query.email}</td>
                                <td>{query.message}</td>

                                <td style={{
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}>
                                    <a href={`mailto:${query.email}?subject=Regarding ${query.message}&body=Dear ${query.name}`}><Button variant="outline-info">Click Here</Button></a>
                                </td>
                            </tr>
                            )
                            :
                            null
                    }


                </tbody>
            </Table>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "25px" }}>
                            <h3>Queries</h3>
                            <button className="syncBtn" onClick={() => { dispatch(getInitialData()) }} ><FaSyncAlt /></button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderQueries()}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
export default Query
