from flask import Flask, make_response, request
import json
import os


app = Flask(__name__)

# 处理ajax中get请求

currentScriptPath = os.path.split(os.path.realpath(__file__))[0]
with open(f'{currentScriptPath}/questions.json', 'r', encoding='UTF-8') as f:
    res = json.load(f)

questions = res["questionList"]
answerList = res["answerList"]

# 将question和answer分类
simple, normal, difficult = {'questionList': []}, {
    'questionList': []}, {'questionList': []}
simpleAnswer, normalAnswer, difficultAnswer = [], [], []

for q in questions:
    if q["type"] == 1:
        simple['questionList'].append(q)
    elif q["type"] == 2:
        normal['questionList'].append(q)
    else:
        difficult['questionList'].append(q)

for a in answerList:
    if a["type"] == 1:
        simpleAnswer.append(a)
    elif a["type"] == 2:
        normalAnswer.append(a)
    else:
        difficultAnswer.append(a)

# 分好的answers
answers = [simpleAnswer, normalAnswer, difficultAnswer]


@app.route('/question', methods=['GET', 'post'])
def testGet():
    res = make_response('myResponse')
    res.headers['Access-Control-Allow-Origin'] = '*'
    type = request.args.get('type')
    if (type == '1'):
        res.set_data(str(simple))
    elif (type == '2'):
        res.set_data(str(normal))
    else:
        res.set_data(str(difficult))
    return res


@app.route('/query', methods=['GET', 'post'])
def query():
    questionId = request.args.get('questionId')
    answer = json.loads(request.values.get('answerList'))
    type = request.values.get('type')
    res = make_response()
    res.headers['Access-Control-Allow-Origin'] = '*'
    # res.set_data(data)
    rightAnswer = list(filter(
        lambda i: i["questionId"] == questionId, answers[int(type)-1]))[0]['answer']
    # 如果两个集合完全一样，则他们的对称差集为空，说明选择的答案正确
    if set(rightAnswer) ^ set(answer):
        print("wrong answer")
        res.set_data('{"code":200}')
    else:
        print("right answer")
        res.set_data('{"code":402}')
    print(request.values.get('answerList'))
    return res


if __name__ == '__main__':
    app.run(debug=True)
