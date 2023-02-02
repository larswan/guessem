require "application_system_test_case"

class CardSetsTest < ApplicationSystemTestCase
  setup do
    @card_set = card_sets(:one)
  end

  test "visiting the index" do
    visit card_sets_url
    assert_selector "h1", text: "Card sets"
  end

  test "should create card set" do
    visit card_sets_url
    click_on "New card set"

    fill_in "Topicname", with: @card_set.topicName
    click_on "Create Card set"

    assert_text "Card set was successfully created"
    click_on "Back"
  end

  test "should update Card set" do
    visit card_set_url(@card_set)
    click_on "Edit this card set", match: :first

    fill_in "Topicname", with: @card_set.topicName
    click_on "Update Card set"

    assert_text "Card set was successfully updated"
    click_on "Back"
  end

  test "should destroy Card set" do
    visit card_set_url(@card_set)
    click_on "Destroy this card set", match: :first

    assert_text "Card set was successfully destroyed"
  end
end
