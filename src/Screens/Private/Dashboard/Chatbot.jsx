import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Linking
} from "react-native";

const Chatbot = () => {
    const isFocus = useIsFocused()
    const navigation = useNavigation()
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Hi there! I'm QuickMySlot Assistant. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [userMsgCount, setUserMsgCount] = useState(0);

    const scrollRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        setTimeout(() => {
            scrollRef?.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages, isTyping]);
    useEffect(() => {
        if (isFocus)
            setUserMsgCount(0)
    }, [isFocus])

    const getBotResponse = (msg) => {
        const lower = msg.toLowerCase();

        // Existing logic
        if (lower.includes("book"))
            return "📅 You can book a slot on our 'Book Now' page!";
        if (lower.includes("cancel"))
            return "❌ You can cancel a booking up to 2 hours before the slot.";
        if (lower.includes("payment"))
            return "💳 We support UPI, credit/debit cards, and net banking.";
        if (lower.includes("contact"))
            return "📞 You can contact us at support@quickmyslot.com.";

        // ⭐ NEW — 9 provider questions
        if (lower.includes("register"))
            return "📝 You can register by submitting your business details and verification documents in the provider app.";

        if (lower.includes("update business"))
            return "✏️ You can update your business profile from the Profile → Business Information section.";

        if (lower.includes("add service") || lower.includes("add services"))
            return "🛠️ Go to Services → Add Service → Enter details → Save.";

        if (lower.includes("availability") || lower.includes("slot"))
            return "⏰ You can manage your working hours under Availability → Set Slots.";

        if (lower.includes("payout"))
            return "💰 Payouts are processed weekly to your registered bank account.";

        if (lower.includes("approved"))
            return "⏳ Profile approval usually takes 12–24 hours while our team verifies documents.";

        if (lower.includes("support"))
            return "📞 You can reach support at support@quickmyslot.com or from the Help section.";

        if (lower.includes("edit booking"))
            return "🔧 Bookings cannot be edited after confirmation. You may cancel and rebook.";

        if (lower.includes("edit"))
            return "🔧 Bookings cannot be edited after confirmation. You may cancel and rebook.";

        if (lower.includes("document") || lower.includes("documents"))
            return "📄 You need Aadhaar, PAN, business proof, and a profile photo for verification.";

        // Existing fallback
        if (userMsgCount >= 3)
            return "🤖 It looks like you have multiple queries! Visit Support Section for more help";

        return "🤔 I'm not sure about that. Please check our Help section for more info!";
    };


    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);
        setUserMsgCount((prev) => prev + 1);
        setInput("");

        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const reply = getBotResponse(input);
            setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
        }, 900);
    };

    const handleLinkPress = (text) => {
        console.log(text, "TEXTT");
        navigation.navigate("Support")
        return
        const urlMatch = text.match(/https?:\/\/\S+/g);
        if (urlMatch) Linking.openURL(urlMatch[0]);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Floating button */}
            {!isOpen && (
                <TouchableOpacity
                    onPress={toggleChat}
                    style={{
                        position: "absolute",
                        bottom: 30,
                        right: 20,
                        backgroundColor: "#EE5138",
                        padding: 14,
                        borderRadius: 40,
                        elevation: 6,
                    }}
                >
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/4712/4712101.png" }}
                        style={{ width: 28, height: 28, tintColor: "white" }}
                    />
                </TouchableOpacity>
            )}

            {/* Chatbox */}
            {isOpen && (
                <View
                    style={{
                        position: "absolute",
                        bottom: 250,
                        right: 20,
                        width: 300,
                        height: 430,
                        backgroundColor: "white",
                        borderRadius: 16,
                        borderColor: "#ddd",
                        borderWidth: 1,
                        overflow: "hidden",
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            backgroundColor: "#EE5138",
                            padding: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/4712/4712101.png" }}
                            style={{ width: 26, height: 26, tintColor: "white" }}
                        />

                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                            QuickMySlot
                        </Text>

                        <TouchableOpacity onPress={() => { setUserMsgCount(0); setMessages([]); toggleChat() }}>
                            <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Messages */}
                    <ScrollView
                        ref={scrollRef}
                        style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}
                    >
                        {messages.map((msg, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => handleLinkPress(msg.text)}
                                style={{
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                    backgroundColor:
                                        msg.sender === "user" ? "#EE5138" : "#ddd",
                                    padding: 10,
                                    borderRadius: 14,
                                    maxWidth: "75%",
                                    marginBottom: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        color: msg.sender === "user" ? "white" : "black",
                                        fontSize: 13,
                                    }}
                                >
                                    {msg.text}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        {isTyping && (
                            <View
                                style={{
                                    backgroundColor: "#ddd",
                                    padding: 10,
                                    borderRadius: 14,
                                    alignSelf: "flex-start",
                                }}
                            >
                                <Text>Typing...</Text>
                            </View>
                        )}
                    </ScrollView>

                    {/* Input */}
                    <View
                        style={{
                            flexDirection: "row",
                            padding: 10,
                            borderTopWidth: 1,
                            borderColor: "#ccc",
                        }}
                    >
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder="Type message…"
                            style={{
                                flex: 1,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 10,
                            }}
                        />

                        <TouchableOpacity
                            onPress={sendMessage}
                            style={{
                                backgroundColor: "#EE5138",
                                paddingVertical: 10,
                                paddingHorizontal: 14,
                                marginLeft: 8,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ color: "white" }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Chatbot;
