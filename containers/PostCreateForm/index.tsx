
import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd'

import { Loader } from '../../components/Loader'

import styles from './PostCreateForm.module.scss'

interface Props {
    isVisible: boolean;
    isLoading: boolean;
    initialValues: Record<string, any> | null
    onSubmit: (values: any) => Promise<any>;
    onClose: () => void
}

export const PostCreateForm = (props: Props) => {
    const { isVisible, isLoading, initialValues, onSubmit, onClose } = props;

    const [form] = Form.useForm();

    const onSubmitHandler = (e: any) => {
        onSubmit(form.getFieldsValue()).then((res) => {
            form.resetFields()
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        initialValues ? form.setFieldsValue(initialValues) : form.resetFields();
    }, [initialValues])

    return (
        <div className={styles.postCreateForm}>
            <div className={`${isVisible ? 'active' : ''} post-create-form__container`}>
                <Form
                    disabled={isLoading}

                    layout="vertical"
                    form={form}
                    initialValues={{ ...initialValues }}
                    onSubmitCapture={onSubmitHandler}
                >
                    <Form.Item label="Caption" name="caption" required>
                        <Input placeholder="Enter post caption..." />
                    </Form.Item>
                    <Form.Item label="Text" name="text" required>
                        <Input.TextArea placeholder="Enter post text..." rows={10} />

                    </Form.Item>
                    <div className="post-create-form__buttons">
                        <Button type="primary" htmlType='submit'>Submit</Button>
                        <Button type="default" htmlType='button' onClick={() => onClose()}>Close</Button>
                    </div>
                </Form>
                <Loader isLoading={isLoading} />
            </div>
        </div >
    )
}

export const PostCreateFormMemo = React.memo(PostCreateForm);