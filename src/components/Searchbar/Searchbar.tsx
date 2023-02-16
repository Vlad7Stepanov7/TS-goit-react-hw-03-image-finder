import { Formik } from "formik";
import { Header, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";
import { CiSearch } from "react-icons/ci";
import { FC } from "react";

interface IProps {
    onSubmit: (value: string) => void;
    notify: () => void;
}

interface IMyFormValues {
   search: string;
}
 
const Searchbar: FC<IProps> = ({ onSubmit, notify }) => {

    const initialValues: IMyFormValues = { search: "" }

    return (
     <Header>
         <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const { search } = values;
                if (search.trim() === '') {
                    notify();
                    return
                }
                onSubmit(search);
                actions.resetForm();
            }}
             >
            <SearchForm>
                <SearchFormButton type="submit">
                    <CiSearch size="24px"/>
                </SearchFormButton>
                <SearchFormInput
                  type="text"
                  name="search"
                  placeholder="Search images and photos"
                />
            </SearchForm>
        </Formik>
     </Header>
    )
}

export default Searchbar;