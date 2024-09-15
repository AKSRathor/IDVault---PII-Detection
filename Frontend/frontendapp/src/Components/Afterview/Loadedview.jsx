import { Modal, Skeleton } from "antd"
import Getload from "./Getload"



const Loadedview = ({ isLoaded, setIsLoaded, myReponse, modal2Open, setModal2Open }) => {
    


    return (
        <div>
            <Modal
                title="PII Detection Result"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                width={"95vw"}
                maxheight={"95vh"}
                style={{ overflowX: "auto" }}
            >
                {isLoaded ? (<Getload myReponse = {myReponse} setMy/>) : (
                    <div className='flex flex-col gap-4'>
                        <Skeleton active paragraph={{
                            rows: 6,
                        }}
                        />
                        <Skeleton active paragraph={{
                            rows: 3,
                        }}

                        />

                        <Skeleton active paragraph={{
                            rows: 5,
                        }}

                        />
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default Loadedview