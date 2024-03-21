import Translate from "@/components/i18n/Translate";
import { loadMessages } from "@/components/i18n/messages";

export default async function HomePage() {
  const messages = await loadMessages("en");

  return (
    <div className="py-10">
      <Translate messages={messages} />
    </div>
  );
}
