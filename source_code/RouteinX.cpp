#include <iostream>
#include <fstream>
#include <string>
#include <limits> 
using namespace std;

const int max_task = 100;
struct Task{
    char description[101];
    int priority;
    bool completed;
    char time[6];
};

// function declarations
void initaltask(Task* tasks, int& taskCount);
void Menu();
void addtask(Task* tasks, int& taskCount);
void displaytasks(Task* tasks, int taskCount);
void marktaskcompleted(Task* tasks, int taskCount);
void savefile(Task* tasks, int taskCount, const char *filename);
void loadfromfile(Task* tasks, int& taskCount, const char *filename);
void clearinputbuffer();

int main() {

    Task tasks[max_task];
    int taskCount = 0;
    const char* filename = "tasks.txt";
    //cout<<"Daily Routine manager"<<endl;                                                                                 
                                                                                    
cout<<" ▄▄▄▄▄▄                                     ██                         ▄▄▄  ▄▄▄ "<<endl;
cout<<" ██▀▀▀▀██                        ██         ▀▀                          ██▄▄██  "<<endl;
cout<<" ██    ██   ▄████▄   ██    ██  ███████    ████     ██▄████▄   ▄████▄     ████   "<<endl;
cout<<" ███████   ██▀  ▀██  ██    ██    ██         ██     ██▀   ██  ██▄▄▄▄██     ██    "<<endl;
cout<<" ██  ▀██▄  ██    ██  ██    ██    ██         ██     ██    ██  ██▀▀▀▀▀▀    ████   "<<endl;
cout<<" ██    ██  ▀██▄▄██▀  ██▄▄▄███    ██▄▄▄   ▄▄▄██▄▄▄  ██    ██  ▀██▄▄▄▄█   ██  ██  "<<endl;
cout<<" ▀▀    ▀▀▀   ▀▀▀▀     ▀▀▀▀ ▀▀     ▀▀▀▀   ▀▀▀▀▀▀▀▀  ▀▀    ▀▀    ▀▀▀▀▀   ▀▀▀  ▀▀▀ "<<endl;
                                                                            
                                                                                                                                                                                                                     
    loadfromfile(tasks, taskCount, filename);
    cout<<"Loaded "<<taskCount<<" tasks from previous session."<<endl;
    int choice;

    do {
        Menu();
        cout<<"Enter your choice (1-6): ";
        cin>>choice;
        clearinputbuffer();
        switch(choice){
            case 1:
                addtask(tasks, taskCount);
                break;
            case 2:
                displaytasks(tasks, taskCount);
                break;
            case 3:
                marktaskcompleted(tasks, taskCount);
                break;
            case 4:
                savefile(tasks, taskCount, filename);
                cout<<"Tasks saved to file successfully!"<<endl;
                break;
            case 5:
                loadfromfile(tasks, taskCount, filename);
                cout<<"Tasks reloaded from file!"<<endl;
                break;
            case 6:
                savefile(tasks, taskCount, filename);
                cout<<"Tasks saved."<<endl;
                cout<<"Thank you for using RoutineX!"<<endl;
                cout<<"Visit https://obito0910.github.io/RoutineX  for GUI version"<<endl;
                break;
            default:
                cout<<"Wrong Choice!"<<endl; 
                cout<<"Please enter a number between (1-6)."<<endl;
            }

    }while(choice != 6);
    return 0;
}
// initialize task list
void initaltask(Task *tasks, int& taskCount) {
    taskCount = 0;
}
// Display menu
void Menu() {
    cout<<"<====Main Menu====>"<<endl;
    cout<<"1. Add a new task"<<endl;
    cout<<"2. Display all tasks"<<endl;
    cout<<"3. Mark task as completed"<<endl;
    cout<<"4. Save tasks to file"<<endl;
    cout<<"5. Reload tasks from file"<<endl;
    cout<<"6. Exit program"<<endl;
    cout<<"######################"<<endl;
}
// add task
void addtask(Task*tasks, int& taskCount){
    if(taskCount >= max_task) {
        cout<<"Task list is full! Cannot add more tasks."<<endl;;
        return;
    }
    Task *currentTask = &tasks[taskCount];
    cout<<"===== ADD NEW TASK =====" <<endl;
    cout<<"Enter task description (max 100 chars): ";
    cin.getline(tasks[taskCount].description , 101);
    cout<<"Enter time for task (HH:MM format): ";
    cin.getline(tasks[taskCount].time, 6);
    do {
        cout<<"Enter priority "<<endl;
        cout<<"1-High"<<endl;
        cout<<"2-Medium"<<endl;
        cout<<"3-Low"<<endl;
        cin>>tasks[taskCount].priority;
        clearinputbuffer();
        if (tasks[taskCount].priority < 1 || tasks[taskCount].priority > 3){
            cout<<"Invalid priority"<<endl;
            cout<<"Please enter 1, 2, or 3."<<endl;
        }
    } 
    while (tasks[taskCount].priority < 1 || tasks[taskCount].priority > 3);
    tasks[taskCount].completed = false;
    taskCount++;
    cout<<"Task added successfully"<<endl;
}
// display tasks
void displaytasks(Task tasks[], int taskCount){
    if (taskCount == 0){
        cout<<"No tasks to display."<<endl;
        return;
    }
    for(int i = 0; i < taskCount; i++){
        cout<<"Task #" << i + 1<<endl;
        cout<<"Description: "<<tasks[i].description<<endl;
        cout<<"Time: "<<tasks[i].time<<endl;
        cout<<"Priority: ";
        if (tasks[i].priority == 1){
            cout << "High" << endl;
        }else if (tasks[i].priority == 2){
            cout<<"Medium"<<endl;
        }else{
            cout<<"Low"<<endl;
        }
        cout<<"Status: ";
        if (tasks[i].completed == true){
            cout<<"Completed"<<endl;
        }else{
            cout<<"Pending"<<endl;
        }
        cout<<"_____________________________"<<endl;
    }
}
// mark task completed
void marktaskcompleted(Task* tasks, int taskCount){
    int num;

    if(taskCount == 0){
        cout<<"No tasks available."<<endl;
        return;
    }
    displaytasks(tasks, taskCount);
    cout<<"Enter task number: ";
    cin>>num;
    if(num<1 || num>taskCount){
        cout<<"Invalid task number"<<endl;
        return;
    }
    tasks[num - 1].completed = true;
    cout<<"Task marked as completed"<<endl;
}
// save to file
void savefile(Task* tasks, int taskCount, const char* filename){
    ofstream file(filename);
    if(!file) {
        cout << "Error opening file"<<endl;
        return;
    }
    file<<taskCount<<endl;
    for(int i=0; i<taskCount; i++) {
        file<<tasks[i].description <<endl;
        file<<tasks[i].time <<endl;
        file<<tasks[i].priority <<endl;
        file<<tasks[i].completed <<endl;
    }
    file.close();
}
// load from file
void loadfromfile(Task* tasks, int& taskCount, const char* filename) {
    ifstream file(filename);
    if(!file) {
        taskCount = 0;
        return;
    }
    file>>taskCount;
    file.ignore();
    for(int i=0; i<taskCount; i++) {
        file.getline(tasks[i].description, 101);
        file.getline(tasks[i].time, 6);
        file>>tasks[i].priority;
        file>>tasks[i].completed;
        file.ignore();
    }
    file.close();
}
// clear input buffer
void clearinputbuffer() {
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
}

