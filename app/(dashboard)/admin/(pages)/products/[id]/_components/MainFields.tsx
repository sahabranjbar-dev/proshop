import BaseField from "@/components/BaseField/BaseField";
import { TextCore } from "@/components/TextCore/TextCore";
import { Textarea } from "@/components/ui/textarea";

const MainFields = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BaseField
        name="persianTitle"
        component={TextCore}
        required
        label="عنوان فارسی محصول (نمایش به کاربر)"
      />
      <BaseField
        name="englishTitle"
        component={TextCore}
        label="عنوان انگلیسی (برای سئو)"
      />
      <BaseField name="slug" component={TextCore} label="slug" />
      <BaseField
        name="shortDescription"
        component={Textarea}
        label="توضیحات کوتاه"
        required
      />
      <BaseField
        name="fullDescription"
        component={Textarea}
        label="توضیحات کامل"
        required
        maxLength={10_000}
        containerClassName="lg:col-span-2"
      />
    </div>
  );
};

export default MainFields;
